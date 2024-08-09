function RobotTxtFilter({ }) {
    return <div className="form-group">
        <div className="row">
            <div className="col-sm-3">
                <label htmlFor="robots-txt-filter-ua" className="col-form-label">User-Agent</label>
                <input type="text" className="form-control bg-light border" id="robots-txt-filter-ua" placeholder="*" />
            </div>
            <div className="col-sm-3">
                <label htmlFor="robots-txt-filter-directive" className="col-form-label">Directive</label>
                <input type="text" className="form-control bg-light border" id="robots-txt-filter-directive" placeholder="(Dis)Allow" />
            </div>
            <div className="col-sm-6">
                <label htmlFor="robots-txt-filter-value" className="col-form-label">Path / Value</label>
                <input type="text" className="form-control bg-light border" id="robots-txt-filter-value" placeholder="/" />
            </div>
        </div>
    </div>
}

function MetaFilter({}) {
    return <div className="form-group">
        <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
                <label htmlFor="meta-filter-property" className="col-form-label">Property</label>
                <input type="text" className="form-control bg-light border" id="meta-filter-property" placeholder="generator" />
            </div>
            <div className="col-sm-6">
                <label htmlFor="meta-filter-value" className="col-form-label">Value</label>
                <input type="text" className="form-control bg-light border" id="meta-filter-value" placeholder="Wordpress" />
            </div>
        </div>
    </div>
}

function HeaderFilter({}) {
    return <div className="form-group">
        <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
                <label htmlFor="header-filter-key" className="col-form-label">Key</label>
                <input type="text" className="form-control bg-light border" id="header-filter-key" placeholder="Content-Type" />
            </div>
            <div className="col-sm-6">
                <label htmlFor="header-filter-value" className="col-form-label">Value</label>
                <input type="text" className="form-control bg-light border" id="header-filter-value" placeholder="application/json" />
            </div>
        </div>
    </div>
}

function CertificateFilter({}) {
    return <div className="form-group">
        <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
                <label htmlFor="cert-filter-issuer-orga" className="col-form-label">Issuer Organisation</label>
                <input type="text" className="form-control bg-light border" id="cert-filter-issuer-orga" placeholder="DigiCert Inc" />
            </div>
            <div className="col-sm-6">
                <label htmlFor="cert-filter-issuer-name" className="col-form-label">Issuer Name</label>
                <input type="text" className="form-control bg-light border" id="cert-filter-issuer-name" placeholder="DigiCert SHA2 Secure Server CA" />
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
                <label htmlFor="cert-filter-subject-orga" className="col-form-label">Subject Organisation</label>
                <input type="text" className="form-control bg-light border" id="cert-filter-subject-orga" placeholder="Vodafone GmbH" />
            </div>
            <div className="col-sm-6">
                <label htmlFor="cert-filter-subject-name" className="col-form-label">Subject Name</label>
                <input type="text" className="form-control bg-light border" id="cert-filter-subject-name" placeholder="arcor.de" />
            </div>
        </div>
    </div>
}

export {
    RobotTxtFilter,
    MetaFilter,
    CertificateFilter,
    HeaderFilter
}
