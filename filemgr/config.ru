require_relative "lib/app"
require_relative "lib/db"

App.bootstrap_application

DB.establish_connection do |error, connection, database|
  raise StandardError.new(error) unless error.nil?
  puts "* Database connection successful => #{database}"
end

run Application
