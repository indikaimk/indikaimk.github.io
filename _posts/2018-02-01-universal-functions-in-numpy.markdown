---
layout: post
title:  "Universal Functions in NumPy"
date:   2018-02-01 03:00:00 +0530
categories: python numpy
---
Universal functions (aka ufunc) in NumPy [numpy] are functions that can operate on `ndarray` instances in a vectorized mode. A universal function can take a scalar or an array as input argument and can apply some operation on the scalar or each element of the array respectively, i.e., vectorized mode.

By the way, if you do not know about vectorization in NumPy I suggest you read [Introduction to NumPy] [intro] to get an understanding of it.

We will further explore the behavior of a `ufunc` with the NumPy function `sqrt`, which can calculate the square root of a number.

{% highlight python %}
import numpy as np

print(np.sqrt(4)) 
#=> 2.0

a = np.arange(0,100, 11)
print(np.sqrt(a))
#=> [ 0.          3.31662479  4.69041576  5.74456265  6.63324958  7.41619849  8.1240384   8.77496439  9.38083152  9.94987437]
{% endhighlight %}

In the first case `sqrt` takes a scalar as the input and produce a scalar as an output. However the same function produces an array as output when an array is supplied as the input argument. 

Now we will see how to create a `ufunc`. First we will create an ordinary function and convert it to a `ufunc` with the `vectorize` function provided by NumPy.

{% highlight python %}
def is_even(n):
    if n%2==0:
        return True
    else:
        return False
print(is_even(1))
#=> False
print(is_even(2))
#=> True
{% endhighlight %}

This function will return an error if an array is provided as an argument.
{% highlight python %}
print(is_even(np.arange(1,10)))
{% endhighlight %}

Now we will convert this to a `ufunc` and try the same operation. 

{% highlight python %}
is_even = np.vectorize(is_even)
print(is_even(np.arange(1,10)))
#=> [False  True False  True False  True False  True False]
{% endhighlight %}

Now our function can take arrays as input arguments.

In this post we have scrached the surface of `ufunc` in NumPy. However what you just learned can get you a long way in your data analytic work.
Happy analysing...

[numpy]: http://www.numpy.org/
[intro]: {{ site.baseurl }}{% post_url 2018-01-10-introduction-to-numpy %}
