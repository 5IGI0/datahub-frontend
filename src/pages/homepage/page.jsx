import { useEffect, useState } from "react"

function Homepage({ }) {
    const [stats, setStats] = useState(false)

    useEffect(() => {
        fetch(window.DATAHUB_API_BASE + "stats").
            then((v) => v.json()).
            then((v) => {
                if (v.error_message == null) {
                    setStats(v.data)
                }
            })}, [])

    return <>
        <div className="mt-3 mb-5 text-center mx-auto col-md-8">
            <h1 className="mb-3 fw-semibold lh-1">Search anything you want with Datahub.</h1>
            <p className="lead">Search all you want in our database with advanced search filters</p>
        </div>

        <div class="text-center mt-5">
            <p class="fs-1 mb-1 fw-semibol">{stats ? stats.domains.count.toLocaleString() : "Loading"}</p>
            <p class="mt-1 fs-3">Domains</p>
        </div>

        <div class="text-center mt-5">
            <p class="fs-1 mb-1 fw-semibol">{stats ? stats.http_services.count.toLocaleString() : "Loading"}</p>
            <p class="mt-1 fs-3">Known Sites</p>
        </div>

        <div class="text-center mt-5">
            <p class="fs-1 mb-1 fw-semibol">{stats ? stats.dns_records.count.toLocaleString() : "Loading"}</p>
            <p class="mt-1 fs-3">DNS Records</p>
        </div>

        <div class="text-center mt-5">
            <p class="fs-1 mb-1 fw-semibol">{stats ? stats.ssl_certificates.count.toLocaleString() : "Loading"}</p>
            <p class="mt-1 fs-3">SSL Certificates</p>
        </div>
    </>
}

export {
    Homepage
}