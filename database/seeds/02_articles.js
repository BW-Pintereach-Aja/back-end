exports.seed = async function(knex) {
	await knex('articles').insert([
		{
			url: 'https://dev.to/thinkverse/horizontal-breadcrumb-in-10-ish-lines-of-css-27o5',
			title: 'CSS Something',
			desc: 'horizontal breadcrumbs',
			userID: 1
		},
		{
			url: 'https://dev.to/davidepacilio/35-free-react-templates-and-themes-32ci',
			title: 'Free React Templates + Themes',
			desc: 'at least 35+!!',
			userID: 1
		},
		{
			url: 'https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg',
			title: 'React Cheatsheets for 2020',
			desc: '+real-world examples',
			userID: 2
		},
		{
			url: 'https://dev.to/simonholdorf/9-projects-you-can-do-to-become-a-frontend-master-in-2020-n2h',
			title: '9 Projects you can do to...',
			desc: '...to become a Frontend Master in 2020',
			userID: 2
		},
		{
			url: 'https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib',
			title: 'Making sense of React Hooks',
			desc: 'HOOKS!!!',
			userID: 2
		}
	])
}
