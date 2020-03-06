import axios from "./axios";

const SubmissionsService = {};

function config(token) {
  return {
    headers: {
      "x-access-token": token
    }
  };
}

SubmissionsService.getSubmissions = token => {
  return axios.get(`/submission`, config(token));
};

SubmissionsService.createSubmission = (token, challengeId, answer) => {
  return axios.post(`/submission/${challengeId}`, { answer }, config(token));
};

SubmissionsService.getAllSubmissions = token => {
  return axios.get("/submission/all", config(token));
};

SubmissionsService.reviewSubmission = (
  token,
  submissionId,
  status,
  feedback
) => {
  return axios.post(
    `/submission/review/${submissionId}`,
    { feedback, status },
    config(token)
  );
};

export default SubmissionsService;
