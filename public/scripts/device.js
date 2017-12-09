u('body').on('click', '.action', ({ target }) => {
	const button = u(target);
	const iface = button.closest('.interface').data('interface');
	const action = button.data('action');

	const options = {
		method: 'POST',
		body: { iface, action }
	};

	ajax('/', options);
});
