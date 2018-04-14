---
layout: post
title:  "Working with a real world dataset in pandas"
date:   2018-03-31 06:20:00 +0530
categories: python pandas csv grouping
---

We got a brief introduction to [pandas] [pandas] in our [previous post] [introduction]. In this post we are going use [pandas] [pandas] for a real world use case: analysing data in a telecommunication network. 

First we will import `pandas`, and `numpy` also since we will be using it in our analysis.

{% highlight python %}
import pandas as pd
{% endhighlight %}

Our data is contained in a CSV file and we are going to use the `read_csv` function to read the data into a `DataFrame`.

{% highlight python %}
df = pd.read_csv('data/msc_traffic_0110.csv')
df.head()
#=>		Date			MSC	Call Attempts	Call success	Call Answer	traffic
#	0	2015-01-10 00:00:00	MSC_1	1000		922		702		1198.923158
#	1	2015-01-10 01:00:00	MSC_1	993		899		728		775.090052
#	2	2015-01-10 02:00:00	MSC_1	850		779		671		776.387334
#	3	2015-01-10 03:00:00	MSC_1	821		776		675		879.424597
#	4	2015-01-10 04:00:00	MSC_1	900		892		795		1424.728238
{% endhighlight %}

The `to_csv` function returns a DataFrame object with columns and rows mapped to the contents of the CSV file. This CSV file contains hourly voice call related data of **MSCs** in a telecommunication network. MSC (aka [Mobile Switching Center server] [msc]) is the central call handling node in a telcommunication network. Every call you send or receive on your mobile phone goes through a **MSC** in your service providers network. This particular CSV file contains some statistics related to call handling in MSCs in a telecommunication network. While the column names are somewhat self-explanatory I will provide a little more detail below.

**Call Attempts** is the number of call attempts received to the MSC. **Call success** means the number of calls out of the **Call Attempts** where the MSC was able to connect the other party mobile phone (i.e. the other party mobile phone started ringing). **Call Answer** means the number of calls where the other party actually answered the call. The **traffic** column contain the total number of **call minutes** for that hour. You may observe that **Call success** is less tha **Call Attempt** which means some calls have been failed due to multiple reasons. 

While **Date** is the first column in our CSV file pandas has added an integer index to the DataFrame. Instead we can create an index with the **Date** column by using the `index_col` parameter in `read_csv`.

{% highlight python %}
df = pd.read_csv('data/msc_traffic_0110', index_col='Date')
df.head()
#=>	Date			MSC	Call Attempts	Call success	Call Answer	traffic
#	2015-01-10 00:00:00	MSC_1	1000		922		702		1198.923158
#	2015-01-10 01:00:00	MSC_1	993		899		728		775.090052
#	2015-01-10 02:00:00	MSC_1	850		779		671		776.387334
#	2015-01-10 03:00:00	MSC_1	821		776		675		879.424597
#	2015-01-10 04:00:00	MSC_1	900		892		795		1424.728238
{% endhighlight %}

# Data Types

Now we are going to check how far `pandas` has correctly identified the data-types.

{% highlight python %}
df.dtypes
#=>MSC               object
#  Call Attempts      int64
#  Call success       int64
#  Call Answer        int64
#  traffic          float64
#  dtype: object

df.index[0:2]
#=>Index(['2015-01-10 00:00:00', '2015-01-10 01:00:00'], dtype='object', name='Date')
{% endhighlight %}

While the columns containing numbers have been identified as int64 or float the index has not been identified as a date. We can improve this by using the `parse_dates` parameter.

{% highlight python %}
df = pd.read_csv('data/msc_traffic_0110', index_col='Date', parse_dates=['Date'])
df.index[0:2]
#=>DatetimeIndex(['2015-01-10 00:00:00', '2015-01-10 01:00:00'], dtype='datetime64[ns]', name='Date', freq=None)
{% endhighlight %}

Now the Index has been identified as `datetime64` instead of `object` as before. You may appreciate this extra effort of parsing dates in the following section.

# The time period

If you had inspected the output of `head()` function earlier you may have noticed that our data frame has hourly data staring from 2015-01-10. So what is the time period of our data set? Since our DataFrame is now indexed with `datetime64` datatype we can use a multitude of `datetime` related functions to get an answer to this question.

{% highlight python %}
np.unique(df.index.date)
#=>array([datetime.date(2015, 1, 10)], dtype=object)
{% endhighlight %}

`df.index.date` returns an `ndarray` of dates and we apply the `unique` function from `numpy` on it. So we can see that dataset has data for only one day - 10th of January 2015. Earlier we mentioned that the CSV file contains houlry data. Now we will examine the time values in it.

{% highlight python %}
df.index.hour
#=>Int64Index([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
#            17, 18, 19, 20, 21, 22, 23,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
#            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
#           dtype='int64', name='Date')

df.index.minute
#=>Int64Index([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#            0, 0, 0, 0],
#           dtype='int64', name='Date')

df.index.second
#=>Int64Index([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
#            0, 0, 0, 0],
#           dtype='int64', name='Date')
{% endhighlight %}

Since seconds and minutes are all zero and hour values are from 0 to 23 we can conclude that dataset has hourly data with uniform time intervals.

# How many **MSCs**?

Earlier we mentioned this CSV file contains traffic handling statistics of some **MSCs** in a telecommunication network. How many **MSCs** do we have here? We can use the attribute access methods in `pandas` to get an idea about this.

{% highlight python %}
df.MSC.describe()
#=> count        48
#unique        2
#top       MSC_1
#freq         24
#Name: MSC, dtype: object

df.MSC.unique()
#=> array(['MSC_1', 'MSC_2'], dtype=object)
{% endhighlight %}

So we have data from two **MSCs** in our CSV file. Here the `df.MSC` returns a `Series` containing the `MSC` column in our `DataFrame` and `describe` and `unique` are functions that are applied on the `Series`. 

# Traffic handling in each MSC

Now we are going to analyse the traffic statistics of each MSC with the help of a rich set of grouping features offered by `pandas`. The main function for grouping is `groupby` which returns a `DataFrameGroupBy` object when applied on a `DataFrame`. You may note that the `groupby` function works somewhat similar to the `group by` statement in SQL.

{% highlight python %}
gdf=df.groupby(['MSC'])
gdf.groups.keys()
#=>dict_keys(['MSC_1', 'MSC_2'])
{% endhighlight %}

Here we are using the column **MSC** for grouping and we can see it has used the two **MSCs** as the keys for grouping. Now we have the `DataFrameGroupBy` object which can be used to calculate the total amount of traffic that passed through each **MSC**.

{% highlight python %}
gdf.agg('sum')
#=>	Call Attempts	Call success	Call Answer	traffic
#MSC				
#MSC_1	69975		66854		56048		85296.429342
#MSC_2	60972		58046		47914		74644.733309
{% endhighlight %}

The `sum` is a `numpy` function which is passed as an argument to the `agg` (alias for `aggregate`) function, which calculate the sum of the columns per each key in the group.

# Finding the failed calls

You may remember that we mentioned that **Call sucess** is less than the **Call Attempts**. The difference between them are the number of failed calls. We will calculate that now.

{% highlight python %}
df['Call Failure'] = df['Call Attempts'] - df['Call success']
df.head(3)
#=>			MSC	Call Attempts	Call success	Call Answer	traffic		Call Failure
#Date						
#2015-01-10 00:00:00	MSC_1	1000		922		702		1198.923158	78
#2015-01-10 01:00:00	MSC_1	993		899		728		775.090052	94
#2015-01-10 02:00:00	MSC_1	850		779		671		776.387334	71
{% endhighlight %}

So what hour do we have maximum call failures in each MSC?

{% highlight python %}
gdf=df.groupby(['MSC'])
gdf.agg({'Call Failure': 'max'})
#=>	Call Failure
#MSC	
#MSC_1	320
#MSC_2	351
{% endhighlight %}

Again we are trying to use the `agg` function where we pass a dictionary with column name and function to apply on the column. But do we get what we want? Not really. While we get the maximum number of call failures, without the time, this information is not very usefull.

{% highlight python %}
s1=gdf.get_group('MSC_1')
s1.nlargest(2, 'Call Failure')
#=>			MSC	Call Attempts	Call success	Call Answer	traffic		Call Failure
#Date						
#2015-01-10 21:00:00	MSC_1	4400		4080		3591		6977.363196	320
#2015-01-10 11:00:00	MSC_1	4010		3710		3194		5708.442983	300
{% endhighlight %}

Instead we can use the technique above for each group, which will get the entire row with maximum number of **Call Failure**. While we could apply the same again for **MSC_2** in this particular case, it is impractical if we have, say 10 MSCs. So we iterate over the `DataFrameGroupBy` object and apply the `nlargest` function on each of the groups.

{% highlight python %}
for name, group in gdf:
    print(group.nlargest(1, 'Call Failure'))
#=>			MSC  	Call Attempts  	Call success  	Call Answer  	traffic  	Call Failure 
#Date                                                                   
#2015-01-10 21:00:00  	MSC_1   4400          	4080         	3591   		6977.363196     320  
#                       MSC  	Call Attempts  Call success  Call Answer  	traffic  	Call Failure 
#Date                                                                   
#2015-01-10 21:00:00  	MSC_2   4021          	3670         	2995   	   	4400.457962     351 
{% endhighlight %}

Interstingly both **MSCs** have maximum call failures in the same hour - 9.00 PM.

So in this post we have done a detailed analysis of the data in our CSV file. In the next post we will try to create some graphs using our dataset of the telecommunication network.

[pandas]: https://pandas.pydata.org/
[python]: https://www.python.org/
[numpy]: http://www.numpy.org/
[msc]: https://en.wikipedia.org/wiki/Mobile_switching_centre_server
[introduction]: {{site.baseurl}}{% post_url2018-03-22-introduction to pandas %}


