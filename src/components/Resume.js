import React, { Fragment } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  // Font,
  View,
} from "@react-pdf/renderer";
import { createTimeInfo } from "../lib/utils";
import moment from "moment";
export default Resume;

// const source = "https://fonts.googleapis.com/css?family=Tangerine";

// Font.register({
//   family: "Tangerine",
//   src: source,
//   // fontStyle: "normal",
//   // fontWeight: "normal",
// });

const styles = StyleSheet.create({
  page: {
    padding: 64,
    // fontFamily: "Tangerine",
  },
  name: {
    fontSize: 40,
    marginBottom: 4,
  },
  profession: {
    fontSize: 14,
    marginBottom: 3,
    color: "#990000",
    textTransform: "uppercase",
  },
  contacts: {
    fontSize: 11,
    marginBottom: 18,
    color: "gray",
  },
  section: {
    fontSize: 20,
    marginBottom: 4,
    marginTop: 14,
  },
  title: {
    fontSize: 18,
  },
  personDescription: {
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  sectionHeader: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 2,
  },
  sectionSubHeader: {
    fontSize: 11,
    color: "#990000",
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 12,
  },
  listItem: {
    fontSize: 12,
    paddingLeft: 14,
    marginVertical: 2,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  time: {
    fontSize: 8,
    color: "lightgray",
    marginTop: 28,
  },
});

const name = "Josh Knapp";
const profession = "Front-End Developer";
const phone = "541.368.8091";
const website = "joshmk.com";
const email = "joshknappp@gmail.com";
const description1 = `Best described as a React specialist, I shine at developing high-quality user interfaces while also delivering value across the stack.`;
const description2 = `My favorite part of this career is seeing the joy and/or relief on a user’s face when the software you created solves their problem well. I love simplifying complex needs into simple and beautiful tools. For my next step, I’d like to work with a high-energy, creative team that is loaded with ideas.`;

const frontendSkills =
  "JavaScript, TypeScript, ES6, React, Redux, HTML5, CSS3, SASS, LESS, CSS-in-JS, jQuery";
const backendSkills =
  "Python, Flask, NodeJS, MySQL, CouchDB, REST APIs, Docker";
const testingSkills = "Cypress, Jest, Enzyme, React Testing Library";
const generalSkills =
  "Agile, Lean, Scrum, Azure DevOps, GitHub, CI/CD pipelines, PyCharm, VS Code, Chrome Developer Tools, GIT, Git hooks";

function Resume({ items, education }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{profession}</Text>
        <Text
          style={styles.contacts}
        >{`${phone} - ${website} - ${email}`}</Text>
        <Text style={styles.personDescription}>{description1}</Text>
        <Text style={[styles.personDescription, { marginTop: 4 }]}>
          {description2}
        </Text>
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            marginTop: 16,
            marginBottom: 6,
          }}
        />
        <Text style={styles.section}>Skills</Text>
        <Text style={styles.sectionHeader}>Frontend</Text>
        <Text style={styles.text}>{frontendSkills}</Text>
        <Text style={styles.sectionHeader}>Backend</Text>
        <Text style={styles.text}>{backendSkills}</Text>
        <Text style={styles.sectionHeader}>Testing</Text>
        <Text style={styles.text}>{testingSkills}</Text>
        <Text style={styles.sectionHeader}>General</Text>
        <Text style={styles.text}>{generalSkills}</Text>
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            marginTop: 18,
            marginBottom: 5,
          }}
        />
        <Text style={styles.section}>Experience</Text>
        {items.map((item) => {
          return (
            <>
              <Text
                style={styles.sectionHeader}
              >{`${item.title} / ${item.subtitle}`}</Text>
              <Text style={styles.sectionSubHeader}>{`${createTimeInfo(
                item.start,
                item.end
              )}, ${item.location}`}</Text>
              <Text style={styles.sectionDescription}>{item.description}</Text>
              {item.list && item.list.length > 0
                ? item.list.map((listItem) => {
                    return (
                      <Text style={styles.listItem}>&bull; {listItem}</Text>
                    );
                  })
                : null}
            </>
          );
        })}
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            marginTop: 18,
            marginBottom: 5,
          }}
        />
        <Text style={styles.section}>Education</Text>
        {education.map((item, i) => (
          <Fragment key={i}>
            <Text
              style={styles.sectionHeader}
            >{`${item.title} / ${item.subtitle}`}</Text>
            <Text style={styles.sectionSubHeader}>{`${createTimeInfo(
              item.start,
              item.end
            )}, ${item.location}`}</Text>
            {item.list && item.list.length > 0
              ? item.list.map((listItem) => {
                  return <Text style={styles.listItem}>&bull; {listItem}</Text>;
                })
              : null}
          </Fragment>
        ))}
        <Text style={styles.time}>
          Auto-magically created on {moment().format("MMM D, Y")}
        </Text>
      </Page>
    </Document>
  );
}
