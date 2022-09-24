import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

export default TagEditor;

function TagEditor({ tags = [], tagsOptions = [], onChange }) {
  const selectTags =
    tags && tags.length > 0
      ? tags.map((tag) => ({ label: tag, value: tag }))
      : null;
  const selectTagsOptions =
    tagsOptions && tagsOptions.length > 0
      ? tagsOptions.map((tag) => ({ label: tag, value: tag }))
      : null;

  return (
    <>
      <Form.Label className="mb-0 mt-2">Tags</Form.Label>
      <CreatableSelect
        isMulti
        onChange={(newVal) => {
          const updTags = newVal.map((val) => val.value);
          onChange(updTags);
        }}
        value={selectTags}
        options={selectTagsOptions}
      />
    </>
  );
}
