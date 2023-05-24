export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/api/posts.json`)
	let posts = await res.json()

	let uniqueCategories = {}

	posts.forEach(post => {
		if (post.categories) {
			post.categories.forEach(category => {
				if (Object.prototype.hasOwnProperty.call(uniqueCategories, category)) {
					uniqueCategories[category].count += 1
				} else {
					uniqueCategories[category] = {
						title: category,
						count: 1
					}
				}
			})
		}
	})

	const sortedUniqueCategories = 
		Object.values(uniqueCategories)
			.sort((a, b) => a.title > b.title)

	return { 
		uniqueCategories: sortedUniqueCategories
	}
}