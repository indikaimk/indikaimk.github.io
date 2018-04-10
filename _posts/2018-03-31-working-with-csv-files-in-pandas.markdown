---
layout: post
title:  "Working with CSV Files in pandas"
date:   2018-03-31 06:20:00 +0530
categories: python pandas csv
---

We got a brief introduction to [pandas] [pandas] in our [previous post] [introduction]. In this post we are going to dive a little deeper by using to [pandas] [pandas] to analyse data in a CSV file. 

First we will read the CSV file with `to_csv` function in pandas.
{% highlight python %}
import pandas as pd
df = pd.read_csv('data/msc_traffic_0110.csv')
df.head()
#=>		Date			MSC	Call Attempts	Call success	Call Answer	traffic
#	0	2015-01-10 00:00:00	MSC_1	1000		922		702		1198.923158
#	1	2015-01-10 01:00:00	MSC_1	993		899		728		775.090052
#	2	2015-01-10 02:00:00	MSC_1	850		779		671		776.387334
#	3	2015-01-10 03:00:00	MSC_1	821		776		675		879.424597
#	4	2015-01-10 04:00:00	MSC_1	900		892		795		1424.728238
{% endhighlight %}
The `to_csv` function returns a DataFrame object with columns and rows mapped to the contents of the CSV file. This CSV file contains traffic data related to a **MSC** telecommunication network. MSC (aka Mobile Switching Center) is the central call handling node in a telcommunication network. Every call you send or receive on your mobile phone goes through a MSC. The file contains some statistics related to call handling in MSC. While the column names are somewhat self-explanatory I will explain a little more details below.

**Call Attempts** is the number of call attempts received to the MSC. **Call success** means the number of calls out of the **Call Attempts** where the MSC was able to connect the other party mobile phone (i.e. the other party mobile phone started ringing). **Call Answer** means the number of calls where the other party actually answered the call. The **traffic** column contain the total number of **call minutes** for that hour. You may observe that **Call success** is less tha **Call Attempt** which means some calls have been failed due to multiple reasons. 

While **Date** was the first column in our CSV file pandas has added an integer index to the DataFrame. Instead we can create an index with the **Date** column by using the `index_col` parameter in `to_csv`.

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

Now the Index has been identified as `datetime64` instead of `object` as before.

# Using `groupby`

Now are going to calculate the total traffic carried by each **MSC** in our dataset using the `groupby` function.

{% highlight python %}
df.groupby(['MSC'])['traffic'].sum()
#=>MSC
#MSC_1    85296.429342
#MSC_2    74644.733309
#Name: traffic, dtype: float64
{% endhighlight %}

You may note that this works similar to the `group by` statement in SQL.

{% highlight python %}

{% endhighlight %}

In the next post we will see how to work with csv files in pandas.

[pandas]: https://pandas.pydata.org/
[python]: https://www.python.org/
[numpy]: http://www.numpy.org/
[introduction]: {{site.baseurl}}{% post_url2018-03-22-introduction to pandas %}


