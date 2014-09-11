class User < ActiveRecord::Base
  validates   :username,
              :presence => {:message => "Must input a username."},
              :uniqueness => {:message => "Sorry but that username is not available."}

  validates   :email,
              :presence => {:message => "Must input an email."},
              :uniqueness => {:message => "There is already an account associated with that email address."},
              format: {with: /\S+@\w+.com/, message: "The email address must be formatted properly."}

  validates   :password,
              :presence => {:message => "Must input a password."}

  has_many :budgets
end
