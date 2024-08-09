import { useState } from "react"
import HttpSearchMenu from "./components/SearchMenu"
import { HttpServiceCard } from "./components/HttpServiceCard"

function HttpServicesPage({ }) {
    const [services, setServices] = useState(null)
    const [query, setQuery] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const moreHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch(window.DATAHUB_API_BASE + query.path + "/" + (query.page + 1) + query.params).
            then((v) => v.json()).
            then((v) => {
                console.log(query)
                if (v.error_message != null) {
                    setQuery((q) => { var qc = { ...q }; q.error = v.error_message; return qc; })
                } else if (v.data == null) {
                    setQuery((q) => { var qc = { ...q }; qc.error = "No more result!"; return qc; })
                } else {
                    setServices((s) => [...s, ...v.data])
                    setQuery((q) => { var qc = { ...q }; qc.page += 1; return qc })
                }
            }).
            catch((r) => {
                setError(String(r))
                setServices(null)
            }).
            finally(
                setIsLoading(false)
            )
    }

    return <>
        <h2>HTTP Services</h2>
        <HttpSearchMenu setServices={setServices} setQuery={setQuery} />
        {services && services.map((s, i) => <HttpServiceCard key={i} service={s} />)}
        {query != null && (query.error ?
            <div className="mt-3 alert alert-danger" role="alert">
                {query.error}
            </div>
            : <div className="col-sm-12 mt-3 d-flex justify-content-center">
                <button onClick={moreHandler} className="btn btn-primary" disabled={isLoading}>
                    More
                </button>
            </div>)}
    </>
}

export default HttpServicesPage