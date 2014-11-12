helpers do
  def clear_same_budget(user, budget_name)
    match = user.budgets.find_by(name: budget_name)
    if match
      match.delete
    end
  end

  def signed_in?
    @user ||= User.find(session[:user_id])
  end
end
