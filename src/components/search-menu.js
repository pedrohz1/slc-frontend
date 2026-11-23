import { searchFromAnyEntity } from "../shared/api/global.api";

function SearchMenu({ visibility, query }) {

    searchFromAnyEntity().then((result) => console.log(result))

    return (
        <div className={`card bg-secondary mb-3 ${visibility}`} style={{maxHeight: "1rem"}}>
            <div className="card-header">Header</div>
            <div className="card-body">
            </div>
        </div>
    )
}

export default SearchMenu;