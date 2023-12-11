import { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { useReactToPrint } from "react-to-print";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/Curriculum.css";
import DOMPurify from "dompurify";
import axios from "axios";
import { htmlToDraft } from "html-to-draftjs";

function CurriculumPage() {
  const { user } = useContext(AuthContext);


  const [name, setName] = useState("");
  const [htmlContentName, setHtmlContentName] = useState("");

  const [email, setEmail] = useState("");
  const [htmlContentEmail, setHtmlContentEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [htmlContentPhone, setHtmlContentPhone] = useState("");

  const [address, setAddress] = useState("");
  const [htmlContentAddress, setHtmlContentAddress] = useState("");

  let editorState = EditorState.createEmpty();
  const [summry, setSummry] = useState(editorState);
  const [htmlContentSummry, setHtmlContentSummry] = useState("");

  const [links, setLinksValues] = useState([]);

  const [skills, setSkillsValues] = useState([]);

  const [languages, setLanguageValues] = useState([]);

  const [projects, setProjects] = useState(EditorState.createEmpty());
  const [htmlContentProjects, setHtmlContentProjects] = useState("");

  const [experience, setExperience] = useState(EditorState.createEmpty());
  const [htmlContentExperience, setHtmlContentExperience] = useState("");

  const [education, setEducation] = useState(EditorState.createEmpty());
  const [htmlContentEducation, setHtmlContentEducation] = useState("");

  const [awards, setAwardsValues] = useState([]);

  const componentRef = useRef();

  const API_URL = "http://localhost:5005/api";

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const maxCharSummary = 100;
  const maxCharProjects = 500;
  const maxCharExperience = 1000;
  const maxCharEducation = 500;

  const onNameStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentName(markup);
    setName(text);
  };

  const onEmailStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentEmail(markup);
    setEmail(text);
  };

  const onPhoneStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentPhone(markup);
    setPhone(text);
  };

  const onAddressStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentAddress(markup);
    setAddress(text);
  };

  const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharSummary) {
      setHtmlContentSummry(markup);
      setSummry(editorState);
    }
  };

  const onContentStateChange = (contentState) => {
    console.log(contentState);
  };

  const convertHTMLToContentState = (html) => {
    return stateFromHTML(html);
  };

  const convertContentStateToHTML = () => {
    const contentState = editorState.getCurrentContent();
    return stateToHTML(contentState);
  };

  const handleChangeLink = (index, event) => {
    const linksCopy = [...links];
    linksCopy[index] = event.target.value;
    setLinksValues(linksCopy);
  };

  const handleChangeSkill = (index, event) => {
    const skillsCopy = [...skills];
    skillsCopy[index] = event.target.value;
    setSkillsValues(skillsCopy);
  };

  const handleChangeLanguage = (index, event) => {
    const languagesCopy = [...languages];
    languagesCopy[index] = event.target.value;
    setLanguageValues(languagesCopy);
  };

  const handleAddLink = (event) => {
    event.preventDefault();
    setLinksValues([...links, ""]);
  };

  const handleAddSkill = (event) => {
    event.preventDefault();
    setSkillsValues([...skills, ""]);
  };

  const handleAddLanguage = (event) => {
    event.preventDefault();
    setLanguageValues([...languages, ""]);
  };

  const handleRemoveLink = (index) => {
    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinksValues(linksCopy);
  };

  const handleRemoveSkill = (index) => {
    const skillsCopy = [...skills];
    skillsCopy.splice(index, 1);
    setSkillsValues(skillsCopy);
  };

  const handleRemoveLanguage = (index) => {
    const languagesCopy = [...languages];
    languagesCopy.splice(index, 1);
    setLanguageValues(languagesCopy);
  };

  const onLinksStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    setLinksValues(text.split("\n"));
  };

  const onSkillsStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentSkills(markup);
    setSkillsValues(text);
  };

  const onLanguagesStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentLanguages(markup);
    setLanguageValues(text);
  };

  const onProjectsEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharProjects) {
      setHtmlContentProjects(markup);
      setProjects(editorState);
    }
  };

  const onExperienceEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharExperience) {
      setHtmlContentExperience(markup);
      setExperience(editorState);
    }
  };

  const onEducationEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    if (text.length <= maxCharEducation) {
      setHtmlContentEducation(markup);
      setEducation(editorState);
    }
  };

  const onAwardsStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const rawContent = convertToRaw(contentState);
    const markup = draftToHtml(rawContent);

    setHtmlContentAwards(markup);
    setAwardsValues(text);
  };

  const handleChangeAward = (index, event) => {
    const awardsCopy = [...awards];
    awardsCopy[index] = event.target.value;
    setAwardsValues(awardsCopy);
  };

  const handleAddAward = (event) => {
    event.preventDefault();
    setAwardsValues([...awards, ""]);
  };

  const handleRemoveAward = (index) => {
    const awardsCopy = [...awards];
    awardsCopy.splice(index, 1);
    setAwardsValues(awardsCopy);
  };

  const handleSubmit = (event) => {
    const storedToken = localStorage.getItem("authToken");
    event.preventDefault();

    const requestBody = {
      userId: user._id,
      personalData: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        summary: htmlContentSummry
      },
      links: links,
      skills: skills,
      languages: languages,
      projects: htmlContentProjects,
      experience: htmlContentExperience,
      education: htmlContentEducation,
      awards: awards,
    };

    
    if (storedToken) {
      axios
      .post(`${API_URL}/curriculums`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error creating CV from the API...");
        console.log(error);
      });
  };
    }
   

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="text-2xl text-gray-900">Personal Details</h2>
        <hr className="w-96 m-3" />
        <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={name}
                onChange={(e) => {
                  const updatedEditorState = EditorState.createWithContent(
                    ContentState.createFromText(e.target.value)
                  );
                  onNameStateChange(updatedEditorState);
                }}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={email}
                onChange={(e) => {
                  const updatedEditorState = EditorState.createWithContent(
                    ContentState.createFromText(e.target.value)
                  );
                  onEmailStateChange(updatedEditorState);
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={phone}
                onChange={(e) => {
                  const updatedEditorState = EditorState.createWithContent(
                    ContentState.createFromText(e.target.value)
                  );
                  onPhoneStateChange(updatedEditorState);
                }}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={address}
                onChange={(e) => {
                  const updatedEditorState = EditorState.createWithContent(
                    ContentState.createFromText(e.target.value)
                  );
                  onAddressStateChange(updatedEditorState);
                }}
              />
            </div>
          </div>
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Summary
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ border: "1px solid black", height: "200px" }}
          >
            <Editor
              editorState={summry}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                summry.getCurrentContent().getPlainText("").length >=
                maxCharSummary
              }
            />
          </div>
          <p className=" text-gray-400">
            {" "}
            {maxCharSummary -
              summry.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharSummary}
          </p>
          <br />

          <hr className="w-96 m-3" />

          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Links
            </h2>
            {links &&
              links.map((links, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="input-cv"
                    value={links}
                    onChange={(event) => handleChangeLink(index, event)}
                  />
                  <button
                    onClick={() => handleRemoveLink(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button onClick={handleAddLink} className="btnCV">
              Add Link{" "}
            </button>
          </div>

          <hr className="w-96 m-3" />

          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Skills
            </h2>
            {skills.map((skills, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skills}
                  className="input-cv"
                  onChange={(event) => handleChangeSkill(index, event)}
                  required={true}
                />
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="btbtn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddSkill} className="btnCV">
              Add Skill{" "}
            </button>
          </div>

          <hr className="w-96 m-3" />

          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Languages
            </h2>
            {languages.map((languages, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={languages}
                  className="input-cv"
                  onChange={(event) => handleChangeLanguage(index, event)}
                  defaultValue={"English"}
                />
                <button
                  onClick={() => handleRemoveLanguage(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddLanguage} className="btnCV">
              Add Language{" "}
            </button>
          </div>
          <br />
          <hr className="w-96 m-3" />
          <br />
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Projects
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ border: "1px solid black", height: "200px" }}
          >
            <Editor
              editorState={projects}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onProjectsEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                projects.getCurrentContent().getPlainText("").length >=
                maxCharProjects
              }
            />
          </div>
          <p className="text-gray-400">
            {" "}
            {maxCharProjects -
              projects.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharProjects}
          </p>
          <br />
          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Experience
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{
              border: "1px solid black",
              height: "200px",
              marginBottom: "20px",
            }}
          >
            <Editor
              editorState={experience}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onExperienceEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                experience.getCurrentContent().getPlainText("").length >=
                maxCharExperience
              }
            />
          </div>
          <p className="text-gray-400">
            {maxCharExperience -
              experience.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharExperience}
          </p>
          <br />

          <label
            className="block tracking-wide text-gray-500 text-1xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Education
          </label>
          <div
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{
              border: "1px solid black",
              height: "200px",
              marginBottom: "20px",
            }}
          >
            <Editor
              editorState={education}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEducationEditorStateChange}
              onContentStateChange={onContentStateChange}
              style={{ border: "1px solid black", height: "20px" }}
              readOnly={
                education.getCurrentContent().getPlainText("").length >=
                maxCharEducation
              }
            />
          </div>
          <p className="text-gray-400">
            {maxCharEducation -
              education.getCurrentContent().getPlainText("").length}{" "}
            / {maxCharEducation}
          </p>
          <br />
          <hr className="w-96 m-3" />
          <div>
            <h2 className="tblock tracking-wide text-gray-500 text-1xs font-bold mb-2">
              Awards
            </h2>
            {awards.map((awards, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={awards}
                  onChange={(event) => handleChangeAward(index, event)}
                  className="input-cv"
                />
                <button
                  onClick={() => handleRemoveAward(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={handleAddAward} className="btnCV">
              Add Award{" "}
            </button>
          </div>

          <button type="submit" className="btn-save-CV">
            Save CV
          </button>
        </form>
      </div>

      <div className="preview-container">
        <div className="preview-menu">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-8 "
          >
            Download CV
          </button>
        </div>
        <div className="preview-pdf relative" ref={componentRef}>
          <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentName }}
          />
           <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentEmail }}
          />
           <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentPhone }}
          />
           <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentAddress }}
          />
           <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentSummry }}
          />
           <br />
          <div className="absolute">
            {links &&
              links.map((link, index) => (
                <div key={index}>
                  <span>{link}</span>
                </div>
              ))}
          </div>
          <br />
          <div className="absolute">
            {skills &&
              skills.map((skill, index) => (
                <div key={index}>
                  <span>{skill}</span>
                </div>
              ))}
          </div>
          <br />
          <div className="absolute">
            {languages &&
              languages.map((language, index) => (
                <div key={index}>
                  <span>{language}</span>
                </div>
              ))}
          </div>
          <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentProjects }}
          />
          <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentExperience }}
          />
           <br />
          <div
            className="absolute"
            dangerouslySetInnerHTML={{ __html: htmlContentEducation }}
          />
           <br />
          <div className="absolute">
            {awards &&
              awards.map((award, index) => (
                <div key={index}>
                  <span>{award}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
