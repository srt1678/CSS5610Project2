import './ErrorMessage.css';

export default function ErrorMessage() {
    return (
        <div className="errorMessageContainer">
            <div className="errorMessageText">
                Error! Rows/Columns range is 3 ~ 40
            </div>
        </div>
    );
}
