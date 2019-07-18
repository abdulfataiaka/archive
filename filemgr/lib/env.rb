require_relative "./support/env_helper"

module Env
  extend EnvHelper

  def self.get
    return nil unless is?(raw)
    raw.to_sym
  end

  def self.is? env
    all.include?(env.to_s)
  end

  def self.all
    %w(test development production)
  end
  
  def self.dev?
    get == :development
  end

  def self.prod?
    get == :production
  end
  
  def self.test?
    get == :test
  end
end
