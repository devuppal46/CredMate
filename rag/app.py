from dotenv import load_dotenv
import streamlit as st
import os
from google import genai
from google.genai import types

load_dotenv()

# Initialize Client
if "client" not in st.session_state:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        st.error("Missing GEMINI_API_KEY environment variable.")
        st.stop()
    st.session_state.client = genai.Client(api_key=api_key)

st.title("Credmate: CIBIL Analysis Engine")

# 1. File Upload
uploaded_file = st.file_uploader("Upload CIBIL Report (PDF)", type="pdf")

if uploaded_file and "financial_data" not in st.session_state:
    with st.spinner("Processing messy banking tables..."):
        # Convert file to bytes for the API
        pdf_bytes = uploaded_file.read()
        
        # 2. The Extraction Prompt
        # We tell the model exactly what to look for and how to format it.
        extraction_prompt = """
        Extract the following data from this CIBIL report and format it as a clean summary:
        1. Current Credit Score.
        2. Total outstanding debt (sum of all active loans/cards).
        3. Number of 'Default' or 'Written-off' accounts.
        4. Monthly EMI burden if mentioned.
        5. Any high-interest credit cards (over 30% APR).
        
        Be precise. If data is missing, say 'Not Found'. 
        Provide a 2-sentence brutal assessment of their financial health.
        """

        # 3. Multimodal API Call
        try:
            response = st.session_state.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    types.Part.from_bytes(data=pdf_bytes, mime_type="application/pdf"),
                    extraction_prompt
                ]
            )
            st.session_state.financial_data = response.text
        except Exception as e:
            st.error(f"API Error: {e}")

# 4. Display Results and Chat
if "financial_data" in st.session_state:
    st.subheader("Financial Extraction Result")
    st.info(st.session_state.financial_data)
    
    st.divider()
    st.subheader("Ask follow-up questions")
    
    if "messages" not in st.session_state:
        st.session_state.messages = []

    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    if user_query := st.chat_input("How can I fix my score?"):
        st.session_state.messages.append({"role": "user", "content": user_query})
        with st.chat_message("user"):
            st.markdown(user_query)

        # Contextual response based on the PDF data already extracted
        chat_prompt = f"Based on this data: {st.session_state.financial_data}, answer this: {user_query}"
        
        with st.chat_message("assistant"):
            chat_res = st.session_state.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=chat_prompt
            )
            st.markdown(chat_res.text)
            st.session_state.messages.append({"role": "assistant", "content": chat_res.text})