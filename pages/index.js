import { useState } from 'react'

import response from '../data/allCollections.json'

const {
  data: { categories }
} = response

const categoryNames = categories.map(c => c.name)

const collectionsForCategory = categoryName =>
  categories.filter(cat => cat.name === categoryName)[0].collections

function CollectionsIndex() {
  const [query, setQuery] = useState('')

  return (
    <main>
      <form>
        <input
          type="text"
          size="40"
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
