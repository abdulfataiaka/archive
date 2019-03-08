# cobrax
A software development tool for managing specific kind of applications

# Support applications
* React
* Express API
* Express Server

# Support integrations
* Redux
* Mobx

# utils

This is where the helpers that can be used across all stack binaries are located

# lib

This contains the scripts to manage specific stacks

# lib/{stack}/utils

This is where the helpers that can be used within a specific stack binaries are located

# Identying cobrax application

A cobrax application is identified by locating the `.cobraxrc` in project folder, usually from pwd upward, though we can specify depth of check to maybe 10.


# Notes

Commands for different stack cann be similar but the app type determines how it should run.


# Bash Learnings

> - The length of a string can be gotten using the parameter expansion `${#param}`
> - Substitute default value for a param using `${param:-default}`
> - Arithmetic operations can be performed using the format `$(( expression ))`