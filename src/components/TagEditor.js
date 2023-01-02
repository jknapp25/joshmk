import CreatableSelect from "react-select/creatable";

export default TagEditor;

function TagEditor({ tags = [], tagsOptions = [], onChange }) {
  const selectTags =
    tags && tags.length > 0
      ? tags.map((tag) => ({ label: tag, value: tag }))
      : [];
  const selectTagsOptions =
    tagsOptions && tagsOptions.length > 0
      ? tagsOptions.map((tag) => ({ label: tag, value: tag }))
      : [];

  return (
    <CreatableSelect
      isMulti
      onChange={(newVal) => {
        const updTags = newVal.map((val) => val.value);
        onChange(updTags);
      }}
      menuPlacement="auto"
      placeholder=""
      value={selectTags}
      options={selectTagsOptions}
    />
  );
}
