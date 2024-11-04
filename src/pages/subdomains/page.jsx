import { useState } from "react"
import { SearchButton } from "../../components/SearchButton"
import { inputs2object } from "../../utils"


function SubDomainsPage() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [subdomains, setSubdomains] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        var o = inputs2object(e.target)

        fetch(window.DATAHUB_API_BASE + "domains/subdomains/" + o.domain).
            then((v) => v.json()).
            then((v) => {
                setError(v.error_message)
                if (v.error_message != null) {
                    setSubdomains([])
                } else if (v.data.length == 0){
                    setSubdomains([])
                    setError("No result!")
                } else {
                    setSubdomains(v.data)
                }
            }).
            catch((r) => {
                setError(String(r))
                setServices([])
            }).
            finally(() => 
                setIsLoading(false))
    }

    return <>
        <form onSubmit={onSubmit}>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-6">
                    <label htmlFor="domain" className="col-sm-6 col-form-label">Domain</label>
                    <input type="text" className="form-control bg-light border" id="domain" placeholder="Enter domain" />
                </div>
            </div>

            <div className="col-sm-12 mt-3 d-flex justify-content-center">
                <SearchButton isLoading={isLoading}/>
            </div>
        </form>

        {error && <div className="mt-3 alert alert-danger" role="alert">
                {error}
            </div>}

        <div className="col-sm-12 d-flex justify-content-center">
            <textarea className="col-sm-6 mt-5" rows="30" defaultValue={subdomains.join("\n")}></textarea>
        </div>
    </>
}

export {
    SubDomainsPage
}