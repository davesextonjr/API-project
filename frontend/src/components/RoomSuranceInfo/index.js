import './roomsurance.css'

export default function RoomSurance() {
    const roomSuranceLogo = "/assets/roomsurance-logo.png";
    return (
        <div id="room-surance-page-container">
            <div id="surance-header">
                <img src={roomSuranceLogo} alt='room-surance logo' />
                <p>RoomSurance has you covered with every booking.</p>
            </div>
            <div id="room-surance-body-container">
                <div className="room-surance-body-element">

                <div className="surance-body-header">
                    Guarenteed Place to stay
                </div>
                <div className="surance-body-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis donec et odio pellentesque.
                </div>
            </div>
            <div className="room-surance-body-element">
                <div className="surance-body-header">
                    No Worry Check-in
                </div>
                <div className="surance-body-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis donec et odio pellentesque. Aliquam eleifend mi in nulla.
                </div>
            </div>
            <div className="room-surance-body-element">
                <div className="surance-body-header">
                    Accurate
                </div>
                <div className="surance-body-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis.
                </div>
            </div>
            <div className="room-surance-body-element">
                <div className="surance-body-header">
                    Guarenteed Place to stay
                </div>
                <div className="surance-body-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim tortor at auctor urna nunc id.
                </div>
            </div>
            </div>
        </div>
    )
}
