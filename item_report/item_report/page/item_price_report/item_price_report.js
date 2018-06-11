frappe.ItemPriceReport = Class.extend({
	init: function (wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: "Item Price Report",
			single_column: true
		});
		this.wrapper = wrapper
		this.report_data = ""
		this.make();
		this.add_menu_item();
	},

	make: function() {
		var me = this;
		frappe.call({
			method: "item_report.item_report.page.item_price_report.item_price_report.get_item_prices",
			callback: function(r) {
				if (!r.exc && r.message) {
					
					$(frappe.render_template("item_price_report", {'data': r.message})).appendTo(me.page.main);
				}
			}
		})
	},

	add_menu_item: function() {
		var me = this;
		this.page.add_menu_item(__("Refresh"), function () {
			window.location.reload();
		})

		this.page.add_menu_item(__("Print"), function () {
			me.print_report();
		})
	},

	print_report: function() {
		var me = this;
		var html = frappe.render_template("print_item_price", {'data': me.data})
		var w = window.open();
		w.document.write(html);
	}
})

frappe.pages['item-price-report'].on_page_load = function(wrapper) {
	frappe.item_price_report = new frappe.ItemPriceReport(wrapper);
	frappe.breadcrumbs.add("Item Report");
}