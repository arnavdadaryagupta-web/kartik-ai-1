from events.event_bus import event_bus

event_bus.emit(

    "thinking",

    {

        "message": "Planning..."

    }

)