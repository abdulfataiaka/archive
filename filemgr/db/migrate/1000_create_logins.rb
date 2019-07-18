require "active_record"

class CreateLogins < ActiveRecord::Migration[5.0]
  def change
    create_table :logins do |t|
      t.string :email
      t.string :password
    end
  end
end
