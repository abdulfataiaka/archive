# gem-deploy

A tool to easy manage deployment of ruby gems

# Notes

* Make gem folders optional in gemspec file
* Set version should always be the latest push
* check for version file and release folders on every call
* all dependencies should be available : version file, release folders

# Tasks


#-------------------------------------#
#  Documentation
#-------------------------------------#


# create a build process with important feedback
# - gemspec file created in root
# - gem build file created in root

# gemtool init

# gemtool install
# gemtool -i
# current version should be install version

# gemtool deploy major|minor|patch|pre
# gemtool -d major|minor|patch|pre

# Notes

# - Feedback should be just one for each action, specifying error or success
# - install picks the current version and builds and installs it directly for testing locally
# - deploy needs to know which to send to rubygems
# - There should always be a rebuild on fresh execution where necessary
# - Version number only have .pre postfix when deploying a pre version


# Stories

# - install : I got the current version i am installing, so if this is going to be deployed, this is how it works
