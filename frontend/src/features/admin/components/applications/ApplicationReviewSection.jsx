function ApplicationReviewSection({
  title,
  icon,
  children,
}) {
  return (
    <section className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white border-bottom py-3">
        <div className="d-flex align-items-center gap-2">
          {icon && (
            <i
              className={`bi ${icon} text-primary`}
              aria-hidden="true"
            />
          )}

          <h2 className="h5 fw-bold mb-0">
            {title}
          </h2>
        </div>
      </div>

      <div className="card-body p-4">
        {children}
      </div>
    </section>
  );
}


export default ApplicationReviewSection;