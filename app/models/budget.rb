class Budget < ActiveRecord::Base
  belongs_to :user
  has_many :resources

  validates   :name,
              :presence => {:message => "You must input a budget name to save it."}

  validates_inclusion_of :validate_budget_name, :in => [true], message: "You've already used that budget name!"

  def validate_budget_name
    budget_names = User.find(self.user_id).budgets.map {|budget| budget.name}
    if budget_names.include?(self.name)
      false
    else
      true
    end
  end
end
