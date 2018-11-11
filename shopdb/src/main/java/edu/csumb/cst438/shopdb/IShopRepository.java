package edu.csumb.cst438.shopdb;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import edu.csumb.cst438.shopdb.users.User;

@Repository
public interface IShopRepository extends MongoRepository<User, String> {
    // @Query (value = "{'id':?0}")
    // User findByRepoId(String id);

    // @Query (value = "{'username.username':?0}")
    // User findByUsername(String username);
}