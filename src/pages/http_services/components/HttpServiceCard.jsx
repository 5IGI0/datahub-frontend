import { Fragment } from "react";

const HTTP_SERVICE_CARD_MAXLINE = 10;

function robots_txt_2_text(directives) {
    var current_ua = ""
    var ret = []

    if (directives == null) {
        return ["[no robots.txt]"]
    }

    for (let i = 0; i < directives.length; i++) {
        const dir = directives[i];
        if (dir.useragent != current_ua) {
            ret.push("User-agent: " + dir.useragent)
            current_ua = dir.useragent
        }
        ret.push(dir.directive + ": " + dir.data)
    }

    return ret
}

function HttpServiceCard({ service }) {

    /* determine status color*/
    var status_color = "text-bg-dark"
    const status = service.data.status_code
    if (status >= 100 && status <= 199)
        status_color = "text-bg-secondary"
    if (status >= 200 && status <= 299)
        status_color = "text-bg-success"
    if (status >= 300 && status <= 399)
        status_color = "text-bg-primary"
    if (status >= 400 && status <= 599)
        status_color = "text-bg-danger"

    const url = (service.secure ? "https://" : "http://") +
        service.domain + (service.data.path ? ("/" + service.data.path) : "")
    const certificate = service.data.certificate;

    const no_wrap_css = {
        "whiteSpace": "nowrap",
        "overflow": "hidden",
        "textOverflow": "ellipsis"
    }

    return <>
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title"><span className={status_color + " rounded p-1"}>{status}</span> {service.data.title || "[NO TITLE]"}</h5>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <h6 className="card-subtitle mt-1 text-body-secondary">{url}</h6></a>
                <div className="row mt-3">
                    <p className="col-sm-3 mb-0">Headers</p>
                    <p className="col-sm-5 mb-0">Certificate</p>
                    <p className="col-sm-4 mb-0">Robots.txt</p>
                </div>
                <div className="row mt-1">
                    <div className="col-sm-3" style={no_wrap_css}>
                        <p className="text-body-secondary fs-6">{Object.keys(service.data.headers).map((k, i) => <Fragment key={i}>{
                            i < HTTP_SERVICE_CARD_MAXLINE ?
                                <>{k}: {service.data.headers[k]}<br /></> :
                                i == HTTP_SERVICE_CARD_MAXLINE ? "..." : null
                        }</Fragment>)}</p>
                    </div>
                    <div className="col-sm-5" style={no_wrap_css}>
                        <p className="text-body-secondary fs-6">
                            {certificate == null ? "[no certificate]" :
                                <>
                                    issuer: {certificate.issuer.rfc4514}<br />
                                    subject: {certificate.subject.rfc4514}<br />
                                    from: {certificate.valid_after}<br />
                                    to: {certificate.valid_before}
                                </>
                            }
                        </p>
                    </div>
                    <div className="col-sm-4" style={{ no_wrap_css }}>
                        <p className="text-body-secondary fs-6">{
                            robots_txt_2_text(service.data.robots_txt).map(
                                (l, i) => <Fragment key={i}>{
                                    i < HTTP_SERVICE_CARD_MAXLINE ? <>{l}<br /></> :
                                        i == HTTP_SERVICE_CARD_MAXLINE ? "..." : ""}</Fragment>)}</p>
                    </div>
                </div>
                {/* <p className="card-text mt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a> */}
            </div>
        </div>
    </>
}

export {
    HttpServiceCard
}