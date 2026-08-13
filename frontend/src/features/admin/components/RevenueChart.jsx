function formatCurrency(amount) {
  return new Intl.NumberFormat(
    "en-KE",
    {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }
  ).format(amount || 0);
}


function RevenueChart({ data = [] }) {
  const maxRevenue = Math.max(
    ...data.map((item) => item.revenue),
    1
  );


  const totalRevenue = data.reduce(
    (total, item) => total + item.revenue,
    0
  );


  return (
    <section className="card border-0 shadow-sm h-100">

      <div className="card-header bg-white border-0 pt-4 px-4">

        <div className="d-flex justify-content-between align-items-start gap-3">

          <div>
            <h2 className="h5 fw-bold mb-1">
              Revenue Overview
            </h2>

            <p className="text-muted small mb-0">
              Payment revenue for the last six months
            </p>
          </div>


          <div className="text-end">

            <span className="text-muted small d-block">
              Last 6 Months
            </span>

            <strong className="h6 mb-0">
              {formatCurrency(totalRevenue)}
            </strong>

          </div>

        </div>

      </div>


      <div className="card-body px-4 pb-4">

        {data.length === 0 ? (

          <div className="text-center py-5 text-muted">

            <i
              className="bi bi-bar-chart-line fs-2 d-block mb-3"
              aria-hidden="true"
            />

            <p className="mb-0">
              No payment data available yet.
            </p>

          </div>

        ) : (

          <div
            className="d-flex align-items-end justify-content-between gap-3"
            style={{
              height: "260px",
            }}
          >

            {data.map((item) => {

              const height =
                (item.revenue / maxRevenue) * 100;

              return (
                <div
                  key={item.key}
                  className="d-flex flex-column align-items-center flex-grow-1 h-100"
                >

                  <div className="w-100 d-flex align-items-end flex-grow-1">

                    <div
                      className="w-100 bg-primary rounded-top position-relative"
                      style={{
                        height: `${height}%`,
                        minHeight:
                          item.revenue > 0
                            ? "6px"
                            : "2px",
                      }}
                      title={formatCurrency(item.revenue)}
                    />

                  </div>


                  <div className="pt-2 text-center">

                    <small className="d-block fw-semibold">
                      {item.label}
                    </small>

                    <small className="text-muted">
                      {formatCurrency(item.revenue)}
                    </small>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </section>
  );
}


export default RevenueChart;