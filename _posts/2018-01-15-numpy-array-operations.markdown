---
layout: post
title:  "NumPy Array Operations"
date:   2018-01-15 08:00:00 +0530
categories: python numpy
---
In a [prvious post] [introduction] we discussed about [NumPy] [numpy], which forms the basis for most of the scientific computing in [Python] [python]. Today we are going to delve a little deeper into `ndarray`; the core object in NumPy package.

Essentially `ndarray` is an n-dimensional homogeneous array, which is capable of holding a large dataset and applying a wide range of mathematical operations on it. Most of these operations are implemented in compiled C code for efficient execution.

# Creating Arrays
First we will see commonly used methods for creating `ndarray` instances in NumPy.

## Built in methods
NumPy package has several built in methods that can generate `ndarray` instances.
{% highlight python %}
np.arange(1,10)
#=>array([1, 2, 3, 4, 5, 6, 7, 8, 9])

np.ones(5)
#=>array([1., 1., 1., 1., 1.])

np.random.rand(10)
#=>array([0.14245448, 0.1990937 , 0.71651958, 0.35923402, 0.86413695, 0.53962684, 0.34619239, 0.98247115, 0.62557562, 0.60308359])
{% endhighlight %}

We can create a 2-dimensional `ndarray` by using the `reshape` function.
{% highlight python %}
np.arange(0,10).reshape(2,5)
#=>array([[0, 1, 2, 3, 4],
#       [5, 6, 7, 8, 9]])
{% endhighlight %}

## Converting from Python lists
We can use the `array` function to generate an `ndarray` from a Python list.
{% highlight python %}
np.array([1, 2, 3, 4, 5])
#=>array([1, 2, 3, 4, 5])
{% endhighlight %}

## Reading from files
Now we will read a CSV file to a numpy array. 
{% highlight python %}
import numpy as np
np.genfromtxt('data/numbers.csv', delimiter=',')
#=>array([[ 1.,  2.,  3.,  4.],
#       [ 5.,  6.,  7.,  8.],
#       [10., 12., 35., 34.],
#       [ 4., 56., 74., 33.]])
{% endhighlight %}
You may remember that we mentioned earlier that `ndarray` is homogeneous , which means all its elements should be of same data type. The `genfromtxt` function determine the data type by the contents of the file and in this case it has been identified as float.
In our case we know we have only integers in the CSV file. So we can specify the data type as below.
{% highlight python %}
x = np.genfromtxt('data/numbers.csv', delimiter=',', dtype='int32')
x
#=>array([[ 1,  2,  3,  4],
#       [ 5,  6,  7,  8],
#       [10, 12, 35, 34],
#       [ 4, 56, 74, 33]])
{% endhighlight %}

# Arithmatic operations
All common arithmatic operations such as addition, subtraction, multiplication, division, modulus, exponent and florr division are applicable on arrays. When any of these are performed with a scalar the operation will be broadcasted to all the elements in the array. We will see how this work by applying addition and multiplication on the array that we created earlier from the CSV file. The rest of the arithmatic operations also will behave in the same way.
{% highlight python %}
## Addition
x+4
#=>array([[ 5,  6,  7,  8],
#       [ 9, 10, 11, 12],
#       [14, 16, 39, 38],
#       [ 8, 60, 78, 37]])

## Multiplication
x*5
#=>array([[  5,  10,  15,  20],
#       [ 25,  30,  35,  40],
#       [ 50,  60, 175, 170],
#       [ 20, 280, 370, 165]])
{% endhighlight %}

We can also perform arithmatic operation using two arrays. We will see how this work with the modulus operator. It is required that the two arrays are of same shape for these operations.
{% highlight python %}
y = np.arange(1,17).reshape(4,4)
y
#=>array([[ 1,  2,  3,  4],
#       [ 5,  6,  7,  8],
#       [ 9, 10, 11, 12],
#       [13, 14, 15, 16]])

x%y
#=>array([[ 0,  0,  0,  0],
#       [ 0,  0,  0,  0],
#       [ 1,  2,  2, 10],
#       [ 4,  0, 14,  1]], dtype=int32)
{% endhighlight %}

# Array manipulation

Now we will explore some common array manipulation techniques.
## Transpose
The `transpose` function will return an array with rows and columns interchanged.
{% highlight python %}
x.transpose()
#=>array([[ 1,  5, 10,  4],
#       [ 2,  6, 12, 56],
#       [ 3,  7, 35, 74],
#       [ 4,  8, 34, 33]])
{% endhighlight %}
## Reshape
With the `reshape` function we can change the row and column count of the array while keeping the same number of elements.
{% highlight python %}
x.shape
#=>(4, 4)
x.reshape(2,8)
#=>array([[ 1,  2,  3,  4,  5,  6,  7,  8],
#       [10, 12, 35, 34,  4, 56, 74, 33]])
{% endhighlight %}

In this post we have explored some of the common operations that we can apply on `ndarray`. However there are many more array operations that are implemented in NumPy package. 

We will discuss more about them in upcoming posts.

[python]: https://www.python.org/
[numpy]: http://www.numpy.org/
[introduction]: {{ site.baseurl }}{% post_url 2018-01-10-introduction-to-numpy %}
