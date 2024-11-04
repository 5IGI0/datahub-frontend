
function SearchButton({isLoading}) {
    return <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status"> Loading...</span></> :
            <>Search</>}
    </button>
}

export {
    SearchButton
}