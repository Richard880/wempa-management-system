import { useState } from "react";

function UserSearch({
  users = [],
  loading = false,
  onSearch,
  onSelectUser,
  disabled = false,
  styles,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(searchTerm);
  };

  const getFullName = (user) =>
    user.displayName ||
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ") ||
    user.email;

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Add Administrator
        </h2>
      </div>

      <form
        className={styles.searchForm}
        onSubmit={handleSubmit}
      >
        <div className={styles.searchField}>
          <label
            className={styles.searchLabel}
            htmlFor="admin-user-search"
          >
            Search User
          </label>

          <input
            id="admin-user-search"
            type="search"
            className={`form-control ${styles.searchInput}`}
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search by name, email or membership number"
            disabled={disabled || loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={disabled || loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {users.length > 0 && (
        <div className={styles.searchResults}>
          <h3 className={styles.sectionTitle}>
            Search Results
          </h3>

          <ul className={styles.resultsList}>
            {users.map((user) => (
              <li
                key={user.id}
                className={styles.userItem}
              >
                <div className={styles.userDetails}>
                  <strong className={styles.userName}>
                    {getFullName(user)}
                  </strong>

                  <div className={styles.userEmail}>
                    {user.email}
                  </div>

                  <div className={styles.userRole}>
                    Current role: {user.role}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => onSelectUser(user)}
                  disabled={disabled}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default UserSearch;