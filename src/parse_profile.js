function extract_profile_name(document){
    var profile_name = ""
    var els = document.querySelectorAll('.text-heading-xlarge');
    for (const element of els) {
        profile_name = element.innerText;
        console.log(hidden_element)
    }
    return profile_name
}

function extract_profile_info(document){
    var profile_info = {}
    var current_key = null
    var current_value = null

    var els = document.querySelectorAll('.visually-hidden');
    const key_elements = ["About", "Education", "Experience", "Volunteering", "Licenses & certifications", 
    "Skills", "Recommendations", "Honors & awards", "Organizations", "Causes",
    "Publications", "Courses", "Interests", "Projects", "Patents"]

    for (const element of els) {
        hidden_element = element.innerText;
        
        if (key_elements.includes(hidden_element)){
            if (current_key!=null){
                profile_info[current_key] = current_value
            }
            console.log(hidden_element)
            current_key = hidden_element
            current_value = ""
        }
        else{
            current_value = current_value + " " + hidden_element
        }
    }
    return profile_info
}

profile_name = extract_profile_name(document)
profile_info = extract_profile_info(document)
profile_info['Name'] = profile_name
