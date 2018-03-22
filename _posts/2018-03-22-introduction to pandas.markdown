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

In the above examples we used a Python `list` to create a Series but there are many other methods to do it.

{% highlight python %}
#Python dict
pd.Series({'a' : 10, 'b': 20, 1: 30})

{% endhighlight %}





{% highlight python %}

{% endhighlight %}


We will discuss more about them in upcoming posts.

[pandas]: https://pandas.pydata.org/
[python]: https://www.python.org/
[numpy]: http://www.numpy.org/
[introduction]: {{ site.baseurl }}{% post_url 2018-01-10-introduction-to-numpy %}
