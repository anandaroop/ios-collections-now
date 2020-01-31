import { useState } from 'react'

import response from '../data/allCollections.json'

const {
  data: { categories }
} = response

const categoryNames = categories.map(c => c.name)

const collectionsForCategory = categoryName =>
  categories
    .filter(cat => cat.name === categoryName)[0]
    .collections.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    })

function CollectionsIndex() {
  const [query, setQuery] = useState('')

  return (
    <main>
      <style global jsx>{`
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>

      <style jsx>{`
        main {
          margin: 1em;
        }

        li {
          padding: 0.25em 0;
        }

        input[type='text'] {
          margin: 0;
          padding: 0.25em;
          font-size: 1em;
          width: calc(100% - 0.5em);
        }
      `}</style>
      <form>
        <input
          type="text"
          placeholder="filter by collection name"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <div>
        {categoryNames.map(categoryName => (
          <section key={categoryName}>
            <h1>{categoryName}</h1>
            <ul>
              {collectionsForCategory(categoryName).map(collection => {
                const shouldDisplay =
                  query.length === 0 ||
                  collection.title.toLowerCase().indexOf(query.toLowerCase()) >=
                    0
                return (
                  shouldDisplay && (
                    <li key={collection.slug}>
                      <a href={`artsy:///collection/${collection.slug}`}>
                        {collection.title}
                      </a>
                    </li>
                  )
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

export default CollectionsIndex
