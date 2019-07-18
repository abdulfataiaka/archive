# file-store

[![Build Status](https://travis-ci.org/abdulfataiaka/filemgr.svg?branch=master)](https://travis-ci.org/abdulfataiaka/filemgr)

A React/Sinatra application for file transfers 

https://filemgrapp.herokuapp.com/


# Desgins 

* Auth page : https://my.1password.com/signin?l=en


# Idea behind the application

The is expected to be an application that any one can use to transfer files from the local computer to a remote file cloud storage
Some of the remove cloud file storage includes
* Cloudinary
* Google Cloud Storage


# Users

There should be a single user application, where a user will have to be authenticated to access their uploaded files for download and upload new onces
Those for the start, we can seed in a user details into the application the first time.


# Features

* Transfer files
* Download files
* See upload queue
* See uploaded files


# Important note for expectations

* The uploads is to a remote wen server not cloud
* They have to be able to perform other actions while downloads are in progress

# Development note

* We need to know how long it will take to transfer files
* We need to restrict file uploads on file size, number of files and file mimetype
* We need to be able to see upload queues

# Flow

The application have three flows which is : Client -> Server -> Cloud

```ruby
task :withargs, [:a, :b] => [] do |task, args|
  args.with_defaults(a: 90, b: 56)
  puts args.a
  puts args.b
end
```