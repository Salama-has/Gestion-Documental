<?php
header('Access-Control-Allow-Origin: *');

include('conexionbd.php');

// Get search term and search option from AJAX request
$searchTerm = $_POST['searchTerm'];
$searchOption = $_POST['searchOption'];

// Query the database based on the search term and search option
if ($searchOption == 'title' || $searchOption == 'content' || $searchOption == 'file') {
  $sql = "SELECT * FROM posts WHERE $searchOption LIKE '%$searchTerm%'";
  $result = $connect->query($sql);

  // Build an array of search results
  $results = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $highlightedTitle = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["title"]);
      $highlightedContent = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["content"]);
      $results[] = array(
        "title" => $highlightedTitle,
        "content" => $highlightedContent,
        "file" => basename($row["file"])
      );
    }
  } else {
    $results[] = array("message" => "No results found.");
  }

  // Return the results in JSON format
  echo json_encode(array("searchResults" => $results));
}

if ($searchOption == 'authorname') {
  $sql = "SELECT posts.title, posts.content, posts.file, authors.authorname FROM authors INNER JOIN posts ON posts.author = authors.id WHERE $searchOption LIKE '%$searchTerm%'";
  $result = $connect->query($sql);

  // Build an array of search results
  $results = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $highlightedTitle = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["title"]);
      $highlightedContent = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["content"]);
      $highlightedContent = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["authorname"]);
      $results[] = array(
        "title" => $highlightedTitle,
        "content" => $highlightedContent,
        "file" => basename($row["file"]),
        "author" => $highlightedContent 
      );
    }
  } else {
    $results[] = array("message" => "No results found.");
  }

  // Return the results in JSON format
  echo json_encode(array("searchResults" => $results));
}
if ($searchOption == 'taGname') {
  $sql = "SELECT posts.title, posts.content, posts.file, authors.authorname ,tags.taGname FROM authors INNER JOIN tags ON posts.tag_id = tags.id WHERE $searchOption LIKE '%$searchTerm%'";
  $result = $connect->query($sql);

  // Build an array of search results
  $results = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $highlightedTitle = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["title"]);
      $highlightedContent = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["content"]);
      $highlightedContent = preg_replace("/($searchTerm)/i", "<span style='color:red;'>$1</span>", $row["authorname"]);
      $results[] = array(
        "title" => $highlightedTitle,
        "content" => $highlightedContent,
        "file" => basename($row["file"]),
        "author" => $highlightedContent 
      );
    }
  } else {
    $results[] = array("message" => "No results found.");
  }

  // Return the results in JSON format
  echo json_encode(array("searchResults" => $results));
}
// Close the database connection
$connect->close();
