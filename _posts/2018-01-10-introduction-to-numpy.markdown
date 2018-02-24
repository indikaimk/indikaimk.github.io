---
layout: post
title:  "Introduction to NumPy"
date:   2018-01-10 02:43:21 +0530
categories: python numpy
---
[Python] [python] is a popular language used in the world of data science and scientific computing. Much of the power of Python is due to the vast number of feature-rich packages that are built around it. [NumPy] [numpy] is one such package, which actually forms the basis of scientific computing in [Python] [python]. So if you are into data science with [Python] [python] it is essential that you master how to use [NumPy] [numpy]. 

At its core NumPy enables you to perform a multitude of mathematical operations on multidimensional arrays. Now you may think that same can be done using Python sequences. However you may run into trouble if you have to deal with very large data sets containing millions of entries. 

So let's write some code and benchmark NumPy. By this time if you do not have NumPy installed please head over to [installation instructions][install-numpy] and follow the steps to set it up.

First we will create 2 Python lists containing million entries each and multiply them together. As you can see from the output the multiplying operation takes around 5 seconds.

{% highlight python %}
import time

a = []
b = []
c = []
a.extend(range(1, 10000001))
b.extend(range(1, 20000000, 2))
t1 = time.perf_counter()
for i in a:
  c.append(a[i-1] * b[i-1])
print("Time elapsed", time.perf_counter() - t1) 
#=> Time elapsed 5.439634913000191
{% endhighlight%}

Now we will see how the same thing can be achieved using NumPy in a fraction of a second.

{% highlight python %}
import time
import numpy as np

m = np.array(np.arange(1, 10000001))
n = np.array(np.arange(1, 20000000, 2))
t1 = time.perf_counter()
p = m * n
print("Time elapsed", time.perf_counter() - t1)
#=>Time elapsed 0.02333582700066472
{% endhighlight%}

NumPy handles most of the complex array operation in compiled C code while Python provides a wrapper around so that you can work comfortably without being concerned about the intricacies of C language. However since most of the array operations are handled by the compiled C code, NumPy can deliver results more efficiently than native Python lists.

In addition to this efficiency NumPy provide two important features: vectorization and broadcasting.

#Vectorization
Vectorization is the ability of handling array operations without using explicit loops. This can be easily understood by below example of multiplying two vectors.

{% highlight python linenos %}
import numpy as np

#Vector multiplication with Python Lists
a = [1,2,3,4]
b = [5,6,7,8]
c = []

#c = a*b => This would give an error

for i in a:
  c.append(a[i-1]*b[i-1])
print(c)
#=>[5, 12, 21, 32]

#Vector multiplication with NumPy
d = np.array([1,2,3,4])
e = np.array([5,6,7,8])
print(d*e) 
#=>[ 5 12 21 32]
{% endhighlight%}

As you can observe, with Python lists we have to explicitly loop over the two vectors and multiply each element. But NumPy handles looping action in efficient, compiled C code behind the scene. This enables us to write concise Python code resembling standard mathematical operations.

#Broadcasting
Broadcasting refers to the fact that all array operations are applied to the array in an element-by-element style. The simple code example below highlight this feature of NumPy.

{% highlight python linenos %}
import numpy as np

#Multiplying a Python list by 2
a = []
a.extend(range(1,11))
print("a*2 = ", a*2) #=> a*2 =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

#Multiplying a NumPy array by 2
a = np.array(np.arange(1,11))
print("a*2 = ", a*2) #=> a*2 =  [ 2  4  6  8 10 12 14 16 18 20]
{% endhighlight%}

When you multiply a Python list by two it will result in a list that replicates the original lists by two time. You may note that this type of duplicating is of very little use in the arena of data science. However when a NumPy array is multiplied by 2 it multiples each element of the array by 2, i.e., apply the operation element-by-element. Broadcasting is actually a comprehensive topic that we will explore in more detail in upcoming posts.

I hope that I was able to give you a fairly good taste of NumPy. 
So... keep learning...

[install-numpy]: https://scipy.org/install.html
[python]: https://www.python.org/
[numpy]: http://www.numpy.org/

