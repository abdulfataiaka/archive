require_relative './spec_helper'

RSpec.feature 'Demo test using rack::test', type: :feature do
  scenario 'go to home page' do
    visit '/'
  end
end

RSpec.feature 'Demo test using selenium', type: :feature do
  setjs_driver

  scenario 'go to home page' do
    visit '/'
  end
end
