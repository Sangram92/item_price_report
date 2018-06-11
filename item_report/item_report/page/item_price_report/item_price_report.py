import frappe

@frappe.whitelist()
def get_item_prices():
	data = frappe.db.sql("""
			select name, price_list, item_code, price_list_rate, 
			if (selling = 1, 'Selling', 'Buying') as selling_buying
			from `tabItem Price` group by item_code, price_list_rate
		""", as_dict=True)
	print "data____________________________________________________\n\n", data
	return data
