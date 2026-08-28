import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import styles from "./GeneralSettingsPage.module.css";

export default function GeneralSettingsPage() {
  const {
    formMethods: {
      register,
      formState: { errors, isDirty },
    },
    loading,
    saving,
    error,
    successMessage,
    onSubmit,
    clearMessages,
  } = useGeneralSettings();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Loading settings configuration...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.settingsContainer}>
      <div className="mb-4">
        <h1 className="h3 text-gray-800">Global Settings</h1>
        <p className="text-muted">
          Configure and control organization variables and structural engine
          defaults.
        </p>
      </div>

      {/* Tabs Navigation Layout Mock for Scaling Settings System */}
      <ul className={`nav ${styles.navTabsCustom}`}>
        <li className="nav-item">
          <button
            className={`nav-link ${styles.navLinkCustom} ${styles.navLinkCustomActive}`}
          >
            General Settings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${styles.navLinkCustom} text-muted`}
            disabled
          >
            Organization / Branding
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${styles.navLinkCustom} text-muted`}
            disabled
          >
            Membership Configuration
          </button>
        </li>
      </ul>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={clearMessages}
            aria-label="Close"
          />
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={clearMessages}
            aria-label="Close"
          />
        </div>
      )}

      <div className={styles.settingsCard}>
        <div className={styles.cardHeaderCustom}>
          <h5 className="m-0 font-weight-bold text-primary">
            General Configuration
          </h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3 mb-4">
              <div className="col-md-8">
                <label className="form-label font-weight-bold">
                  Organization Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.organizationName ? "is-invalid" : ""}`}
                  {...register("organizationName")}
                />
                {errors.organizationName && (
                  <div className="invalid-feedback">
                    {errors.organizationName.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label font-weight-bold">Acronym</label>
                <input
                  type="text"
                  className={`form-control ${errors.acronym ? "is-invalid" : ""}`}
                  {...register("acronym")}
                />
                {errors.acronym && (
                  <div className="invalid-feedback">
                    {errors.acronym.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label font-weight-bold">
                  Support Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.supportEmail ? "is-invalid" : ""}`}
                  {...register("supportEmail")}
                />
                {errors.supportEmail && (
                  <div className="invalid-feedback">
                    {errors.supportEmail.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label font-weight-bold">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.contactPhone ? "is-invalid" : ""}`}
                  {...register("contactPhone")}
                />
                {errors.contactPhone && (
                  <div className="invalid-feedback">
                    {errors.contactPhone.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label font-weight-bold">
                  Default Currency
                </label>
                <select
                  className={`form-select ${errors.currency ? "is-invalid" : ""}`}
                  {...register("currency")}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="KES">KES (KSh)</option>{" "}
                  {/* Added Kenya Shillings */}
                </select>
                {errors.currency && (
                  <div className="invalid-feedback">
                    {errors.currency.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label font-weight-bold">
                  System Timezone
                </label>
                <select
                  className={`form-select ${errors.timezone ? "is-invalid" : ""}`}
                  {...register("timezone")}
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="America/New_York">
                    EST / EDT (America/New_York)
                  </option>
                  <option value="Europe/London">
                    GMT / BST (Europe/London)
                  </option>
                  <option value="Africa/Nairobi">EAT (Africa/Nairobi)</option>
                </select>
                {errors.timezone && (
                  <div className="invalid-feedback">
                    {errors.timezone.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label font-weight-bold">
                  Fiscal Year Begins
                </label>
                <select
                  className={`form-select ${errors.fiscalYearStart ? "is-invalid" : ""}`}
                  {...register("fiscalYearStart")}
                >
                  <option value="January">January</option>
                  <option value="April">April</option>
                  <option value="July">July</option>
                  <option value="October">October</option>
                </select>
                {errors.fiscalYearStart && (
                  <div className="invalid-feedback">
                    {errors.fiscalYearStart.message}
                  </div>
                )}
              </div>
            </div>

             <div className="col-md-4">
    <label className="form-label font-weight-bold">System Default Theme</label>
    <select className={`form-select ${errors.defaultTheme ? 'is-invalid' : ''}`} {...register('defaultTheme')}>
      <option value="light">Light Mode Theme</option>
      <option value="dark">Dark Mode Theme</option>
    </select>
    {errors.defaultTheme && <div className="invalid-feedback">{errors.defaultTheme.message}</div>}
    <small className="text-muted d-block mt-1">
      Sets the baseline theme engine profile for all user roles across the platform.
    </small>
  </div>

            <div className={`mb-4 ${styles.switchContainer}`}>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="maintenanceModeSwitch"
                  {...register("maintenanceMode")}
                />
                <label
                  className="form-check-label font-weight-bold text-warning-dark"
                  htmlFor="maintenanceModeSwitch"
                >
                  Enable Global System Maintenance Mode
                </label>
              </div>
              <small className="text-muted d-block mt-1">
                Activating this locks public portals and application submissions
                while allowing Super Administrators clear system optimization
                access.
              </small>
            </div>

            <div className="d-flex justify-content-end gap-2 border-top pt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || !isDirty}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Preserving Configuration...
                  </>
                ) : (
                  "Save General Settings"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
