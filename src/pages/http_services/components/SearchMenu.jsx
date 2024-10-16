import { useState } from "react";
import { RadioChoice, getRadioChoiceValue } from "../../../components/RadioChoice"
import { CertificateFilter, HeaderFilter, MetaFilter, RobotTxtFilter } from "./AdditionalFilters";
import { inputs2object } from "../../../utils";

const input_id_2_param = {
    "actual-path": "path",
    "status-code": "status_code",
    "domain": "domain",
    "page-title": "title",
    "only-https-btn": "secure",

    "robots-txt-filter-ua": "useragent",
    "robots-txt-filter-directive": "directive",
    "robots-txt-filter-value": "val",

    "meta-filter-property": "property",
    "meta-filter-value": "content",

    "header-filter-key": "key",
    "header-filter-value": "val",

    "cert-filter-issuer-orga": "issuer_orga",
    "cert-filter-issuer-name": "issuer_name",
    "cert-filter-subject-orga": "subject_orga",
    "cert-filter-subject-name": "subject_name"
}

const additional_filter_2_endpoint = {
    "nothing": "services/http",
    "meta": "services/http_by_meta",
    "certificate": "services/http_by_cert",
    "header": "services/http_by_header",
    "robots.txt": "services/http_by_robots_txt"

}

function HttpSearchMenu({ setServices, setQuery }) {
    const [additionalFilter, setAdditionalFilter] = useState("nothing")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const values = inputs2object(e.target)

        var params = ""
        Object.entries(values).forEach(([key, value]) => {
            if (input_id_2_param[key] !== undefined)
                params += (params.length ? "&" : "?") + input_id_2_param[key] + "=" + encodeURIComponent(value)
        });

        fetch(window.DATAHUB_API_BASE + additional_filter_2_endpoint[additionalFilter] + params).
            then((v) => v.json()).
            then((v) => {
                setError(v.error_message)
                setQuery(null)
                if (v.error_message != null) {
                    setServices(null)
                } else if (v.data == null){
                    setServices(null)
                    setError("No result!")
                } else {
                    setServices(v.data)
                    setQuery({
                        "path": additional_filter_2_endpoint[additionalFilter],
                        "params": params,
                        "page": 1,
                        "has_result": true
                    })
                }
            }).
            catch((r) => {
                setError(String(r))
                setServices(null)
            }).
            finally(() => 
                setIsLoading(false))
    }

    return <form onSubmit={onSubmit} id="httpSearchForm">
        <div className="form-group">
            <label htmlFor="page-title">Page Title</label>
            <input type="text" className="form-control bg-light border" id="page-title" placeholder="Enter page title" />
        </div>

        <div className="row">
            <div className="form-group col-sm-6">
                <label htmlFor="actual-path" className="col-sm-12 col-form-label">Actual Path</label>
                <input type="text" className="form-control bg-light border" id="actual-path" placeholder="Enter actual path" />
            </div>
            <div className="col-sm-6 form-group">
                <label htmlFor="status-code" className="col-sm-6 col-form-label">Status Code</label>
                <input type="number" placeholder="status-code" className="form-control bg-light border" id="status-code" />
            </div>
        </div>

        <div className="form-group">
            <div className="row">
                <div className="col-sm-6">
                    <label htmlFor="domain" className="col-sm-6 col-form-label">Domain (and subdomains)</label>
                    <input type="text" className="form-control bg-light border" id="domain" placeholder="Enter domain" />
                </div>
                <div className="col-sm-6">
                    <label className="col-sm-6 col-form-label">Other Options</label><br />
                    <input type="checkbox" className="btn-check" id="only-https-btn" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="only-https-btn">Only HTTPS</label>
                </div>
            </div>
        </div>

        <p className="col-form-label text-center mt-3">Additional Filter</p>
        <div className="d-flex mt-1 form-group justify-content-center">
            <RadioChoice id="http-additional-filter" value={additionalFilter} choices={[
                { name: "Nothing", value: "nothing" },
                { name: "Header", value: "header" },
                { name: "Certificate", value: "certificate" },
                { name: "Robots.txt", value: "robots.txt" },
                { name: "Meta", value: "meta" }
            ]} onChange={(v) => setAdditionalFilter(v)} />
        </div>

        {additionalFilter == "robots.txt" && <RobotTxtFilter />}
        {additionalFilter == "meta" && <MetaFilter />}
        {additionalFilter == "certificate" && <CertificateFilter />}
        {additionalFilter == "header" && <HeaderFilter />}

        <div className="col-sm-12 mt-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status"> Loading...</span></> :
                    <>Search</>}
            </button>
        </div>

        {error != null && <div className="mt-3 alert alert-danger" role="alert">
            {error}
        </div>}
    </form>
}

export default HttpSearchMenu