helpers do


  def signed_in?
    @user ||= User.find(session[:user_id])
  end
end
