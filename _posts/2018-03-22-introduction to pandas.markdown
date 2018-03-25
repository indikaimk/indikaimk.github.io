---
layout: post
title:  "Introduction to Pandas"
date:   2018-03-22 05:00:00 +0530
categories: python pandas
---
If you were to ask a bunch of data scientists "What is the go-to [Python] [python] package for real world data analysis?" definitely the answer would be "[Pandas] [pandas]" and there is a good reason for that. [pandas] [pandas] provides data structures that can hold large data sets of multiple data types and a wide range of analytic tools that can operate on the data sets.

# Data Structures

## Series
Series is an indexed one-dimensional array that can hold multiple types of data. So what really is the index?. We can clarify this by looking at an example.

{% highlight python %}
a = pd.Series(data=[1,2,3,4,5,'x'], index=['a','b','c','d','e','f'])
print(a.index)
#=>Index(['a', 'b', 'c', 'd', 'e', 'f'], dtype='object')
print(a.values)
#=>[1 2 3 4 5 'x']
print(a['a'])
#=>1
print(a[0])
#=>1
{% endhighlight %}

So index act as a label for the data in the Series object. If we did not provide the `index` explicitly [pandas] [pandas] will automatically create a `RangeIndex`.

{% highlight python %}
b = pd.Series(data=[1,2,3,4,5,'x'])
b.index
#=>RangeIndex(start=0, stop=6, step=1)
b[1]
#=>2
{% endhighlight %}

In the above examples we used a Python `list` to create a Series. Now we will see how to create a Series with Python `dict`.

{% highlight python %}
x = {'a': 10, 'b': 20, 1: 'a'}
pd.Series(x)
#=>a    10
#b    20
#1     a
#dtype: object
pd.Series(x, index=[1, 'b', 'c'])
#=>1      a
#b     20
#c    NaN
#dtype: object
{% endhighlight %}

When using a `dict` to create a Series, `pandas` will automatically create the index from the keys of the dictionary if index is not explicitly provided. Alternatively if we specify the index `pandas` will pull out the corresponding values from the `dict` instance to create the Series. If a dictionary key does not exist for a given value in index `NaN` (Not a Number) will be assigned.

## DataFrame
DataFrame is a 2-dimensional data structure with labeled rows and columns where the row-labels are called **index** and column-labels are called **columns**. DataFrame is the commonly used data structure in real world data analysis. Now let's see how we can create DataFrame objects.

We can create a DataFrame with a dict of Series. In the created DataFrame each series will be mapped to a column and the keys of the dict will be mapped to the column labels. The index of the DataFrame will be created from the index of the Series.

{% highlight python %}
s1 = pd.Series(data=[1,2,3,4], index=['a', 'b', 'c', 'd'])
s2 = pd.Series(data=[30, 31, 30, 29], index=['a', 'b', 'c', 'd'])
s3 = pd.Series(data=[100, 102, 103], index=['a', 'c', 'd'])

pd.DataFrame({'col-1': s1, 'col-2': s2})
#=>   col-1	col-2
#  a	1	30
#  b	2	31
#  c	3	30
#  d	4	29

pd.DataFrame({'col-1': s1, 'col-2': s3})
#=>  col-1	col-2
#  a	1	100.0
#  b	2	NaN
#  c	3	102.0
#  d	4	103.0
{% endhighlight %}

As you may have observed in second scenario NaN is assigned to index 'b' of 'col-2' since there is no corresponding value for `s3['b']`. Alternatively we can use lists in the place of Series in the above code.
This is not the only way to create a DataFrame. Let's look at some other methods available.

### From dict of ndarrays
We can create a DataFrame with ndarrays of same length.	
{% highlight python %}
d = {'a': [1,2,3,4], 'b':[100,0,0,10]}
pd.DataFrame(d)
#=>     a	b
#  0	1	100
#  1	2	0
#  2	3	0
#  3	4	10
pd.DataFrame(d, index=['a','b','c','d'])
#=>	a	b
#  a	1	100
#  b	2	0
#  c	3	0
#  d	4	10
{% endhighlight %}

### From 2-d ndarray
{% highlight python %}
d=np.array([[1,2,3,4], [10,20,30,40]])
pd.DataFrame(d, index=['a', 'b'])
#=>     0	1	2	3
# a	1	2	3	4
# b	10	20	30	40
{% endhighlight %}

### From list of dicts
{% highlight python %}
d=[{'a':1, 'b':2, 'c':3}, {'a':10, 'b':100}]
pd.DataFrame(d)
#=>     a	b	c
# 0	1	2	3.0
# 1	10	100	NaN
{% endhighlight %}
While there are multiple other ways of creating DataFrame objects these are the most commonly used ones.

# Basic Operations
Now we will look at some of the basic operations on the Series and DataFrame objects.
## Data Selection/Indexing
Data selection is also known as indexing in the data science world. Indexing on Series objects is somewhat similar to that of ndarrays, with the added functionality of using the index.

{% highlight python %}
s1 = pd.Series(data=[1,2,3,4], index=['a','b','c','d'])
s1['a']
#=>1
s1[0]
#=>1
s1[0:2]
#=>a    1
#  b    2
#  dtype: int64
{% endhighlight %}

Now we will see how to do the data selection on DataFrame objects. The important thing to remember is the use of the `loc` function to access indexes while `[]` is used to access columns.
{% highlight python %}
s1 = pd.Series(data=[1,2,3,4], index=['a','b','c','d'])
s2 = pd.Series(data=[10,20,30,40], index=['a','b','d','e'])
df = pd.DataFrame({'col-1': s1, 'col-2':s2})
df['col-1']
#=>a    1.0
#  b    2.0
#  c    3.0
#  d    4.0
#  e    NaN
#  Name: col-1, dtype: float64
df.loc['a']
#=>col-1     1.0
#  col-2    10.0
#  Name: a, dtype: float64
df.loc[['a', 'b']]
#=>col-1	col-2
#  a	1.0	10.0
#  b	2.0	20.0
{% endhighlight %}

## Column addition and deletion
Now we will add column 'col-3' to the DataFrame created above and delete 'col-2'.
{% highlight python %}
s3 = pd.Series(data=[10,15,24,10], index=['a','b','c', 'e'])
df['col-3'] = s3
df
#=>     col-1	col-2	col-3
# a	1.0	10.0	10.0
# b	2.0	20.0	15.0
# c	3.0	NaN	24.0
# d	4.0	30.0	NaN
# e	NaN	40.0	10.0
df.pop('col-2')
df
#=>     col-1	col-3
# a	1.0	10.0
# b	2.0	15.0
# c	3.0	24.0
# d	4.0	NaN
# e	NaN	10.0
{% endhighlight %}
Note that `pop` function will return the deleted column as a Series.

## Row addition and deletion
Same as columns we can insert and delete rows, but using slightly different methods.
{% highlight python %}
s1 = pd.Series(data=[1,2,3,4], index=['a','b','c','d'])
s2 = pd.Series(data=[10,20,30,40], index=['a','b','d','e'])
df = pd.DataFrame({'col-1': s1, 'col-2':s2})
df.loc['f'] = [1,2]
df
#=>     col-1	col-2
# a	1.0	10.0
# b	2.0	20.0
# c	3.0	NaN
# d	4.0	30.0
# e	NaN	40.0
# f	1.0	2.0
df.drop('e', axis=0)
#=>     col-1	col-2
# a	1.0	10.0
# b	2.0	20.0
# c	3.0	NaN
# d	4.0	30.0
# f	1.0	2.0
{% endhighlight %}

In the next post we will see how to work with csv files in pandas.

[pandas]: https://pandas.pydata.org/
[python]: https://www.python.org/
[numpy]: http://www.numpy.org/

