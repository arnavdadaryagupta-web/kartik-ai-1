from ai.tools.selector import select_tools

from ai.tools.memory_tool import use_memory
from ai.tools.rag_tool import use_rag
from ai.tools.web_tool import use_web
from ai.tools.image_tool import latest_image


def collect_tools(session_id, query):

    enabled = select_tools(query)

    return {

        "memory": (
            use_memory(session_id)
            if enabled["memory"]
            else ""
        ),

        "rag": (
            use_rag(session_id, query)
            if enabled["rag"]
            else ""
        ),

        "web": (
            use_web(query)
            if enabled["web"]
            else ""
        ),

        "image": (
            latest_image(session_id)
            if enabled["image"]
            else None
        )

    }