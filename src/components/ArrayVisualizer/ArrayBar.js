import './ArrayBar.css'


const ArrayBar = ({val}) => {
    console.log(val)
    return(
        <svg width="10" height={val} className="bar-wrapper">
            <rect 
                width="10"
                height={val}
                className="bar"
            />
        </svg>
    )
}

export default ArrayBar;