function formatRevenue(amount) {
  return new Intl.NumberFormat(
    "en-KE",
    {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }
  ).format(amount || 0);
}


function DashboardStats({ stats }) {

  const dashboardStats = [
    {
      label: "Total Members",
      value: stats?.totalMembers ?? 0,
      description: "Registered members",
      icon: "bi-people",
    },
    {
      label: "Active Members",
      value: stats?.activeMembers ?? 0,
      description: "Currently active",
      icon: "bi-person-check",
    },
    {
      label: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      description: "Awaiting review",
      icon: "bi-file-earmark-text",
    },
    {
      label: "Total Revenue",
      value: formatRevenue(stats?.totalRevenue),
      description: "All recorded payments",
      icon: "bi-cash-stack",
    },
  ];


  return (
    <section className="row g-4">

      {dashboardStats.map((stat) => (

        <div
          key={stat.label}
          className="col-12 col-sm-6 col-xl-3"
        >
          <article className="card border-0 shadow-sm h-100">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-start mb-4">

                <div>

                  <p className="text-muted small fw-semibold text-uppercase mb-2">
                    {stat.label}
                  </p>


                  <h2 className="h3 fw-bold mb-0">
                    {stat.value}
                  </h2>

                </div>


                <div className="d-flex align-items-center justify-content-center bg-light rounded-3 p-3">

                  <i
                    className={`bi ${stat.icon} fs-4`}
                    aria-hidden="true"
                  />

                </div>

              </div>


              <p className="text-muted small mb-0">
                {stat.description}
              </p>

            </div>

          </article>
        </div>

      ))}

    </section>
  );
}


export default DashboardStats;