class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.string :name
      t.float :b_and_t_rate
      t.integer :total
      t.timestamps
      t.belongs_to :user
    end
  end
end
