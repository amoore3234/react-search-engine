import { useMemo, useState } from "react";
import type { Food } from "../App";

type FoodSearchProp = {
  foods: Food[]
}

export function SearchEngine({ foods }: FoodSearchProp) {
  const [searchFoods] = useState<Food[]>(foods);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filteredFoods = useMemo(() => {
    return searchFoods.filter((searchFood) => {
      const matchSearch = searchFood.name.toLowerCase().includes(searchQuery);
      const matchType = filter == "All" || filter == searchFood.type;
      return matchSearch && matchType
    });
  }, [searchFoods, filter, searchQuery]);

  function handleOnChangeSearch(e: any) {
    setSearchQuery(e.target.value);
  }

  function handleOnChangeFilter(e: any) {
    setFilter(e.target.value);
  }

  return (
    <div style={{ background: '#121212', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px'}}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(handleOnChangeSearch)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff'}}
        />

        <select
          value={filter}
          onChange={handleOnChangeFilter}
          style={{ padding: '8px', borderRadius: '4px', background: '#222', color: '#fff' }}
        >
          <option value="All">All Foods</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Poultry">Poultry</option>
        </select>
      </div>
      {filteredFoods.length === 0 ? (
        <p style={{ color: '#888'}}>No foods were found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
              <th>Type</th>
              <th>Food</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr
                key={food.id}
                style={{borderBottom: '1px solid #222', backgroundColor: 'transparent'}}
              >
                <td style={{ padding: '10px' }}>{food.type}</td>
                <td>{food.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}