require "capybara/rspec"
require "selenium-webdriver"
require_relative "../lib/app"

App.bootstrap_application
Capybara.app = Application

module Helper
  module Feature
    def setjs_driver
      Capybara.current_driver = driver
    end

    def driver
      if Application.environment == :development
        :selenium_chrome
      else
        :selenium_chrome_headless
      end
    end
  end
end

RSpec.configure do |config|
  config.extend Helper::Feature, type: :feature
end